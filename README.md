# Reading service for meters images

## Tech stack

Node.js, Nest.js, Prisma, Gemini and Zod

## Configuration

```bash
docker-compose up 
docker exec -it app /bin/sh -c "npm run prisma:push"
```

## Endpoints

### Create

Responsible for receiving an image at base 64, consult the Gemini and return to
measure read by API.

#### Request

 POST: <http://localhost:3000/upload>

#### Body

    {
        "image": image base64,
        "customer_code": "ABC123",
        "measure_datetime": "2024-09-29T13:06:00Z",
        "measure_type": "GAS"
    }

#### Response

    {
        "measure_uuid": "01924441-247e-7774-99d4-14a39852fd56",
        "customer_code": "ABC123",
        "image_url": "http://localhost:3000/uploads/1727721968736.png",
        "measure_type": "GAS",
        "measure_value": 130,
        "has_confirmed": false,
        "measure_datetime": "2024-09-29T00:00:00.000Z"
    }

### Confirm

Responsible for verifying or rectifying the value read by the LLM.

#### Request

 Patch: <http://localhost:3000/confirm>

#### Body

    {
        "measure_uuid": "01924441-247e-7774-99d4-14a39852fd56",
        "measure_value": 130,
    }

#### Response

    {
        "success": true
    }

### List

In charge of recording the actions taken by a specific client

#### Request

 GET: <http://localhost:3000/list>

It can optionally receive a query parameter "measure_type", which
must be "WATER" or "GAS", example, GET: <http://localhost:3000/list?measure_type=WATER>

#### Response

    {
        "success": true,
        "measures": [
            {
                "measure_uuid": "01924441-247e-7774-99d4-14a39852fd56",
                "customer_code": "ABC123",
                "image_url": "http://localhost:3000/uploads/1727721968736.png",
                "measure_type": "GAS",
                "measure_value": 130,
                "has_confirmed": false,
                "measure_datetime": "2024-09-29T00:00:00.000Z"
            }
        ]
    }
