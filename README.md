This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Reminder app

Example app for purpose of warsawjs workshop #31

## `API`

#### `GET:api/reminders?status={status}`
##### Fetches reminders list by status
###### `response`

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
##### Creates reminder
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
##### Deletes reminder
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


#### `PUT:api/subscriptions`
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


#### `POST:api/subscriptions`
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
