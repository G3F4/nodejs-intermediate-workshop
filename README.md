This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Reminder app

Example app for purpose of warsawjs workshop #31

## `API`

#### `GET:api/reminders?status={status}`
##### `response`

```
{
  list: [
    {
      id: string
      status: 'FUTURE' | 'PAST'
      body: string
      time: Date
    }
  ]
}
```

#### `POST:api/reminders`
###### `body`

```
{
  body: string
  time: Date
}

```

###### `response:status`

```
201 || resource create
```


#### `DELETE:api/reminders`
###### `body`

```
{
  id: string
}

```

###### `response:status`

```
200 || OK
```

#### `GET:api/subscriptions`
##### `response`

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
