This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Reminder app

Example app for purpose of warsawjs workshop #31

## `API`

#### `GET:api/calendar?month={YYYY-MM}`
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
        description: string
        time: string(format=YYYY-MM-DDThh:mm)
      }
    ]
  ]
}
```

#### `GET:api/day?date={YYYY-MM-DD}`
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
    }
  ]
}
```


#### `POST:api/event`
##### Creates event
###### `body`

```
{
  title: string
  description: string
  time: string(format=YYYY-MM-DDThh:mm)
}

```

###### `response:status`

```
201 || resource create
```


#### `PUT:api/event?id={guid}`
##### Updates event
###### `body`

```
{
  title: string
  description: string
  time: string(format=YYYY-MM-DDThh:mm)
}

```

###### `response:status`

```
200 || ok
```


#### `DELETE:api/event?id={guid}`
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


#### `GET:api/subscriptions`
##### Fetches subscriptions list
###### `response`

```
{
  list: [
    {
      id: string
      device: string
      browser: string
    }
  ]
}
```


#### `POST:api/subscriptions`
##### Add subscription
###### `body`

```
{
  data: PushSubscription
}

```
###### `response:status`

```
201 || resource create
```


#### `PUT:api/subscriptions`
##### Tests subscription
###### `body`

```
{
  id: string
}

```
###### `response`

```
{
  status: string
}

```
