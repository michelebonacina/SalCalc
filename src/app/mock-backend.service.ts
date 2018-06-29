import { InMemoryDbService } from 'angular-in-memory-web-api';

// sample data for testing
export class MockBackendService implements InMemoryDbService
{

    // creates new sample data service
    constructor() { }

    // creates and returns the persons sample list
    createDb()
    {
        const persons = [
            {
                id: 1,
                name: "Mario",
                surname: "Rossi",
                birthdate: null,
            },
            {
                id: 2,
                name: "Ugo",
                surname: "Verdi",
                birthdate: null,
            },
            {
                id: 3,
                name: "Guido",
                surname: "Bianchi",
                birthdate: null,
            },
        ];

        return { persons };
    }
}
