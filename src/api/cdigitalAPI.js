import axios from "axios";

const cdigitalApi=axios.create({ baseURL:"http://localhost:4000"});

export default cdigitalApi;