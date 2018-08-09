// define a user
export class User
{
    id: number;                     // user unique indentifier  
    username: string;               // user username
    password: string;               // user password
    lastActionTimestamp: number;    // user last action timestamp
    showDetails: Boolean = false;   // identify if user details are shown
}
