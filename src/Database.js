import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";

const firebaseConfig = {
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://minnehack-environment-default-rtdb.firebaseio.com/",
  projectId: "minnehack-environment",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// export function get_all_databases(){ //return all database
//     const dbRef = ref(getDatabase());
//     get(dbRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             return snapshot;
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
// }

// const snapshot = get_all_databases();
// console.log(snapshot);
// console.log("hi");

// function get_all_users(){
//     return snapshot.users;
// }

// function get_all_events(){
//     return snapshot.events;
// }


export function writeUserData(userId, score) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
            points: score
    });
}

function updateUserScore(userId, d_points){
    const db = getDatabase();
    let userRef = ref(db, 'users/' + userId);
    let newpoints = userRef.val() + d_points;
    userRef.update({
        points: newpoints
    });
}

function changeEventStatus(eventId, status) {
    const db = getDatabase();
    set(ref(db, 'events/' + eventId), {
        completion_status: status
    })
}

function endEvent(eventId){
    changeEventStatus(eventId, "complete");
    const db = getDatabase();
    let pointsRef = ref(db, 'events/' + eventId + "/awarded_points");
    let points = pointsRef.val();
    let usersRef = ref(db, 'events/' + eventId + "/current_players");
    let users = usersRef.val();

    for (let userId in users){ //add points to each user
        updateUserScore(userId, points); 
    }

    deleteEvent(eventId);
}

export function writeEventData(eventId, lat, long, datetimestart, cur_players, req_players, points, status) {
    const db = getDatabase();
    set(ref(db, 'events/' + eventId), {
            location: {
                latitude: lat,
                longitude: long
            },
            datetime: datetimestart,
            current_players: cur_players,
            num_players: cur_players.length,
            required_players: req_players,
            awarded_points: points,
            completion_status: status
    })

    let eventStartCountdown = setInterval(function () {
        let currentdate = new Date();
        if (currentdate > datetimestart.val()){
            changeEventStatus(eventId, "in-progress");

            let eventEndCountdown = setInterval(function () {
                let currentdate = new Date();
                if (currentdate > datetimestart.val()){
                    endEvent(eventId);
                    clearInterval(eventEndCountdown);
                }
            }, 1000)

            clearInterval(eventStartCountdown);
        }
    }, 1000);

}

function addUserToEvent(eventId, userId){
    const db = getDatabase();
    let eventRef = ref(db, "events/" + eventId);
    let usersRef = ref(db, "events/" + eventId + "/current_players");
    let users = usersRef.val().push(userId);

    eventRef.update({
        current_players: users
    });
    
    incrementEvent(eventId);  
}

// Increments number of participants of an event
export function incrementEvent(eventId) {
    const db = getDatabase();
    let numPlayersRef = ref(db, 'events/' + eventId + '/num_players')
    let newNum = numPlayersRef.val() + 1
    console.log(newNum)
    numPlayersRef.update({
        num_players: newNum
    });
}

function deleteEvent(eventId){
    const db = getDatabase();
    let deleteRef = ref(db, "events/" + eventId);
    deleteRef.remove();  
}

function deleteUser(userId){
    const db = getDatabase();
    let deleteRef = db.ref(db, "users/" + userId);
    deleteRef.remove();
}

