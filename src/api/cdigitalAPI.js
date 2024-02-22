import axios from "axios";

const cdigitalApi=axios.create({ baseURL:import.meta.env.VITE_APP_IP_BACKEND});

export default cdigitalApi;