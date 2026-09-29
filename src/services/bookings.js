// services/cabins.js
import api from "./api";

//GET ALL THE BOOKINGS
export async function getBookings({
  status,
  sortBy,
  page = 1,
  limit = 10,
} = {}) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (sortBy) params.set("sortBy", sortBy);
  params.set("page", page);
  params.set("limit", limit);

  const query = params.toString(); // → "status=checked-in&sortBy=startDate-desc"
  const res = await api.get(`/bookings${query ? `?${query}` : ""}`);
  // return res.data.data.data;
  return {
    data: res.data.data.data,
    total: res.data.total,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
}

//GET A BOOKING
export async function getBooking(id) {
  try {
    const res = await api.get(`/bookings/${id}`);
    return res.data.data.data;
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
}

//CREATE A BOOKING AFTER A DATE (when the booking was made)
export async function getBookingsAfterDate(date) {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const res = await api.get(
    `/bookings?createdAt[gte]=${date}&createdAt[lte]=${endOfToday.toISOString()}&limit=1000`,
  );
  return res.data.data.data;
}

// STAYES DAY AFTER (when the guest arrives)
export async function getStaysAfterDate(date) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const res = await api.get(
    `/bookings?startDate[gte]=${date}&startDate[lte]=${today.toISOString()}&limit=1000`,
  );
  return res.data.data.data;
}

//STAYS TODAY
export async function getStaysTodayActivity() {
  const res = await api.get("/bookings/today-activity");
  return res.data.data.data;
}

//CREATE A BOOKING
export async function createBooking() {
  try {
    const response = await api.post("/bookings");
    return response.data.data.data;
  } catch (error) {
    console.error(
      "Cannot create a booking:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

//UPDATE A BOOKING BY CHECK-IN AND CHECK-OUT
export async function updateBooking(id, obj) {
  const res = await api.patch(`/bookings/${id}`, obj);
  return res.data.data.data;
}

//DELETE A BOOKING
export async function deleteBooking(id) {
  await api.delete(`/bookings/${id}`);
}
