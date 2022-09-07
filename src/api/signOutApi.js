import axios from 'axios';

export default function* signOutApi() {
    console.log("In Sign Out Api");
    return yield axios.get("/logout");
}
