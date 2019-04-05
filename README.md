## Calendar server app

Example app for purpose of WarsawJS workshop #31

## `API`

#### `GET: /api/calendar?month={YYYY-MM}`
##### Fetches calendar month
###### `response`

```
{
  data: [
    date: string(format=YYYY-MM-DD),
    events: [
      {
        id: string(format=guid)
        title: string
      }
    ]
  ]
}
```

#### `GET: /api/day?date={YYYY-MM-DD}`
##### Fetches calendar day
###### `response`

```
{
  data: [
    {
      id: string(format=guid)
      title: string
      description: string
      time: string(format=YYYY-MM-DDThh:mm)
      notification: boolean
    }
  ]
}
```


#### `POST: /api/event`
##### Creates event
###### `body`

```
{
  title: string
  description: string
  time: string(format=YYYY-MM-DDThh:mm)
  notification: boolean
}

```

###### `response:status`

```
{
  id: string
}
```


#### `PUT: /api/event/:id`
##### Updates event
###### `body`

```
{
  title: string
  description: string
  time: string(format=YYYY-MM-DDThh:mm)
  notification: boolean
}

```

###### `response:status`

```
{
  id: string
}
```


#### `DELETE: /api/event/:id`
##### Deletes reminder
###### `body`

```
{
  id: string
}

```

###### `response:status`

```
204 || no content
```


#### `POST: /api/subscriptions`
##### Register user subscription
###### `body`

```
{
  data: {
    endpoint: URL
    expirationTime: Date
    keys: { 
      p256dh: string
      auth: string
    }
  }
}

```
###### `response:status`

```
201 || resource create
```


