import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = null, onCloseModal }) {
  const isEditSession = Boolean(cabinToEdit?._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  // using the hooks
  const { updateCabin, isUpdating } = useUpdateCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const isPending = isCreating || isUpdating;

  const onSubmit = (data) => {
    const formData = new FormData();

    //  Append all fields
    formData.append("name", data.name);
    formData.append("maxCapacity", String(data.maxCapacity));
    formData.append("regularPrice", String(data.regularPrice));
    formData.append("discount", String(data.discount || 0));
    formData.append("description", data.description);

    // Append image
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      toast.error("Please select an image");
      return;
    }

    // mutate(formData);

    if (isEditSession) {
      updateCabin(
        {
          id: cabinToEdit._id,
          cabinData: formData,
        },
        {
          onSuccess: () => {
            if (onCloseModal) onCloseModal(); // Close edit form
          },
        },
      );
    } else {
      createCabin(formData, {
        onSuccess: () => {
          reset(); // Reset form after successful create
          onCloseModal?.();
        },
      });
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 40,
              message: "Cabin name must be 40 characters or less",
            },
            minLength: {
              value: 3,
              message: "Cabin name must be at least 3 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "Max Capacity is required",
            min: { value: 1, message: "Capacity should be at least 1" },
            max: { value: 10, message: "Capacity cannot exceed 10" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "Regular Price is required",
            min: { value: 0, message: "Price cannot be negative" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            min: { value: 0, message: "Discount cannot be negative" },
            max: { value: 100, message: "Discount cannot exceed 100%" },
            validate: (value, formValues) => {
              const regularPrice = Number(formValues.regularPrice);
              const discount = Number(value);

              if (regularPrice && discount >= regularPrice) {
                return "Discount must be less than regular price";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", {
            required: "Discription is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })} // ← register() gives us the remote control
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isPending}
          variation="secondary"
          type="reset"
          // onClick={() => reset()}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isPending}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

// ─── PROP TYPES ───
CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    amenities: PropTypes.array,
    isAvailable: PropTypes.bool,
    discountedPrice: PropTypes.number,
  }),
  onCloseModal: PropTypes.func,
};

// ─── DEFAULT PROPS ───
CreateCabinForm.defaultProps = {
  cabinToEdit: null,
  onCloseModal: null,
};
export default CreateCabinForm;
