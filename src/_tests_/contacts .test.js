import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Contacts } from "../pages/Contacts/index";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const users = [{
    "gender": "male",
    "name": {
      "title": "Mr",
      "first": "Hans Jürgen",
      "last": "Metzner"
    },
    "location": {
      "street": {
        "number": 6703,
        "name": "Schulweg"
      },
      "city": "Bayreuth",
      "state": "Berlin",
      "country": "Germany",
      "postcode": 20985,
      "coordinates": {
        "latitude": "-42.0678",
        "longitude": "-157.0292"
      },
      "timezone": {
        "offset": "-10:00",
        "description": "Hawaii"
      }
    },
    "email": "hansjurgen.metzner@example.com",
    "login": {
      "uuid": "591ae121-e029-40eb-88ee-a9791d68dde3",
      "username": "whitewolf669",
      "password": "lockerroom",
      "salt": "6cjJa6Tt",
      "md5": "439a25bf809d9a3dd08979f94a5e330f",
      "sha1": "ac7488ff56eddceffe1469f1a9f8446f61d98f81",
      "sha256": "bbd3582135b2eb35fec4e695891d57899f15407c2fc1804d27408699f5828ec5"
    },
    "dob": {
      "date": "1976-05-17T11:03:43.384Z",
      "age": 45
    },
    "registered": {
      "date": "2010-12-09T21:20:57.778Z",
      "age": 11
    },
    "phone": "0184-5888236",
    "cell": "0179-7655073",
    "id": {
      "name": "",
      "value": null
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/56.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/56.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/56.jpg"
    },
    "nat": "DE"
  },
  {
    "gender": "female",
    "name": {
      "title": "Ms",
      "first": "Ülkü",
      "last": "Çetiner"
    },
    "location": {
      "street": {
        "number": 4435,
        "name": "Istiklal Cd"
      },
      "city": "Gümüşhane",
      "state": "Konya",
      "country": "Turkey",
      "postcode": 32773,
      "coordinates": {
        "latitude": "-18.4379",
        "longitude": "54.6915"
      },
      "timezone": {
        "offset": "0:00",
        "description": "Western Europe Time, London, Lisbon, Casablanca"
      }
    },
    "email": "ulku.cetiner@example.com",
    "login": {
      "uuid": "ec9980b5-ebee-4e67-b584-018ed0229af5",
      "username": "redwolf437",
      "password": "memory",
      "salt": "dgG31ckh",
      "md5": "0695813d815f90472a6b6e9179bea267",
      "sha1": "45d68eb1cbeb1472e67459409d3fe335b0e963e7",
      "sha256": "a606ada6496032687835b6fa8dbbce5f1c61fa9cff3b3b4c3dd51e0a26a37973"
    },
    "dob": {
      "date": "1981-06-11T13:06:08.443Z",
      "age": 40
    },
    "registered": {
      "date": "2010-11-07T18:57:23.532Z",
      "age": 11
    },
    "phone": "(881)-909-8603",
    "cell": "(991)-591-2408",
    "id": {
      "name": "",
      "value": null
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/76.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/76.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/76.jpg"
    },
    "nat": "TR"
  }]

const handlers = [
    rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
              results: users,
            })
        )
    })
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test(`contacts get data success`, async()=>{
    render(<Contacts/>);

    const loader = screen.getByTestId("contacts-loader");

    expect(loader).tobeInDocument();

    await waitForElementToBeRemoved(loader);
    expect(loader).not.tobeInTheDocument();
    expect(screen.getByTestId("contacts-table-container")).tobeInTheDocument()
});