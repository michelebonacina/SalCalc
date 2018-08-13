// define a user
export class User
{
    id: number;                     // user unique indentifier  
    username: string;               // user username
    password: string;               // user password
    name: string;                   // user name 
    surname: string;                // user surname
    active: boolean;                // identified if the user is active (true) or not (false)
    lastPasswordChange: Date;       // last user password change
    lastActionTimestamp: number;    // user last action timestamp
    showDetails: Boolean = false;   // identify if user details are shown
}
