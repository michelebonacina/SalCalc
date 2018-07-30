import { InMemoryDbService } from 'angular-in-memory-web-api';

// sample data for testing
export class MockBackendService implements InMemoryDbService
{

    // create new sample data service
    constructor() { }

    // create and return the persons sample list
    createDb()
    {
        const persons = [
            {
                id: 1,
                name: "Mario",
                surname: "Rossi",
                birthdate: "1970-01-10",
            },
            {
                id: 2,
                name: "Ugo",
                surname: "Verdi",
                birthdate: "1975-10-15",
            },
            {
                id: 3,
                name: "Guido",
                surname: "Bianchi",
                birthdate: "1980-05-06",
            },
        ];

        return { persons };
    }
}
