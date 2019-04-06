# Calendar server app

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
      time: string(format=YYYY-MM-DDTHH:mm)
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
  time: string(format=YYYY-MM-DDTHH:mm)
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
  time: string(format=YYYY-MM-DDTHH:mm)
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
{
  id: string
}
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

## Opis etapów szkolenia
### Etap 1 - początek pracy - routing

Serwer w tym stanie serwuje pliki statyczne z folderu `public`.
Po uruchomieniu serwera, aplikację można zobaczyć w przeglądarce pod adresem `localhost:5000`.
Pierwszym zadaniem, będzie dodanie routingu do serwera.
Na podstawie kontraktu API, opisanego w pliku README na branchu master, dodać należy wszystkie endpointy wykorzystywane przez klienta.
Na razie nie mamy danych, więc będziemy zwracać zamockowane dane w postaci odpowiadającej projektowi api.
Wszystkie endpointy warto zgrupować przy pomocy wspólnego routera.
Po prawidłowym dodaniu endpointów, nie powinniśmy widzieć błędów w konsoli Network w przeglądarce.

Kroki:

* dodać do zależności `body-parser`, `cors`, `dotenv` oraz dodać wykorzystanie do serwera `express`
* użyć middleware `cors` w serwerze
* dodać plik `.env` i dodać go do `.gitignore`
  * zdefiniować DB_HOST
  * skorzystać w połączeniu do bazy danych przez `proccess.env.DB_HOST` - można dodać do pliku z konfiguracją
* stworzyć nowy plik na router główny aplikacji, wewnątrz utworzyć nowy router i wyekportować do użycia przez serwer
* stworzyć nowy plik na router api, wewnątrz utwrzoyć nowy router i wyekportować do użycia że przez router główny
* w pliku z routerem api, zdefiniować wymagane do pracy klienta endpointy zwracające zamockowane dane

[Rozwiązanie tego etapu](https://github.com/G3F4/warsawjs-workshop-31-calendar/compare/workshop...etap-1)

### Etap 2 - logowanie

Do logowania wykorzystamy `OAuth` ze strategią `GitHub`.
Potrzebne będą zależności `passport` oraz `passport-github`.
Rozwiązanie jjest oparte na sesji więc należy dodać do `express` obsługę sesji.
Wykorzystamy do tego zależność `express-session`.

Kroki:

* dodać do zależności `express-session`, `passport`, `passport-github`
* stworzyć plik zawierający kod inicjalizujący passport
  * dodać metodę serializującą użytkownika
  * dodać metodę deserializującą użytkownika
  * użyć strategii `passport-github`
    * dodanie nowej aplikacji github oauth https://github.com/settings/applications/new
    * wykorzystanie `clientID`, `clientSecret` z utworzonej aplikacji gh
    * zdefiniowanie callbacka
  * zaimportować plik w `index.js`
* dodanie do serwera wykorzystania `express-session`
* inicjalizacja `passport`
* dodanie routingu `GET:/`, który przekierowuje niezalogowanych użytkowników do `/auth/github`
* dodanie do głównego routera routingu na:
  * `/logout` - wylogowanie użytkownika i redirect na logowanie
  * `/auth/github` - wykorzystuje middleware `passport` z `github`
  * `/auth/github/callback` - wykorzystuje middleware `passport` z `github` z konfiguracją `failureRedirect` oraz `successRedirect`
* dodanie do routera api middleware czy użytkownik jest zalogowany

[Rozwiązanie tego etapu](https://github.com/G3F4/warsawjs-workshop-31-calendar/compare/etap-1...etap-2)

### Etap 3 - baza danych

Do przechowywania danych użyjemy `MongoDB`. Jako sterownik posłuży nam `mongoose`.
Do pracy będziemy potrzebować 2 modeli i schem - `UserModel` oraz `EventModel`.
Wszystkie operacje na kolekcjach będziemy wykonywać przez moduł proxy api. 
Dzięki temu warstwa bazy danych zostanie wyraźnie odcięta od domeny serwera.
Następnie wykorzystamy nowe api do integracji z `apiRouter`.

Kroki

* dodanie do zależności `moment-timezone` oraz `mongoose`
* stworzenie nowego pliku z kodem odpowiedzialnym za połączenie z bazą danych
* dodanie importu wcześniej stworzonego pliku do `index.js`
* stworzenie pliku na UserModel oraz definicja schemy i modelu mongoose
  * identyfikator użytkownika powinień być unikalnym indexem
* stworzenie pliku na EventModel oraz definicja schemy i modelu mongoose
* stworzenie pliku na api i zdefiniowanie metod wymaganych do integracji z routerem api
  * getOrCreateUser - jako argumenty przyjmuje id użytkownika oraz callback
    * zwraca wywołanie callback z błędem oraz obiekt `{ userId }`
    * wykorzystać w strategii `oauth` podczas logowania - zamiast zwracać `profile.id` bezpośrednio wykorzystamy UserModel
  * getMonth - jako argumenty przyjmuje id użytkownika i datę w formacie 'YYYY-MM' zwraca:
    * zwracamy 6 tygodni, zaczynając od początku tygodnia 1 dnia miesiąca 
    ```
       data: [
         date: string(format=YYYY-MM-DD),
         events: [
           {
             id: string(format=guid)
             title: string
           }
         ]
       ]
  * getDayEvents - jako argumenty przyjmuje id użytkownika i datę w formacie 'YYYY-MM'
    * zwraca listę wydarzeń danego dnia w postaci:
    ```
       data: [
         {
           id: string(format=guid)
           title: string
           description: string
           time: string(format=YYYY-MM-DDTHH:mm)
           notification: boolean
         }
       ]
  * addEvent - jako argumenty przyjmuje id użytkownika i dane wydarzenia w postaci:
    * ```
         title: string
         description: string
         time: string(format=YYYY-MM-DDTHH:mm)
         notification: boolean
    zwraca id wydarzenia
   
  * updateEvent - jako argumenty przyjmuje id użytkownika i dane wydarzenia w postaci:
     * ```
         title: string
         description: string
         time: string(format=YYYY-MM-DDTHH:mm)
         notification: boolean
    zwraca id wydarzenia
  * deleteEvent - jako argumenty przyjmuje id wydarzenia
    * zwraca id wydarzenia
    
* użycie metod api w routerze

[Rozwiązanie tego etapu](https://github.com/G3F4/warsawjs-workshop-31-calendar/compare/etap-2...etap-3)

### Etap 4 - powiadomienia - obsługa rejestracji subskrycji

Teraz dodamy do aplikacji obsługę powiadomień przy wykorzystaniu `web-push` - zależność należy dodać do projektu.
Do prawidłowego funkcjonowania wymagane jest wygenerowanie poprawnych kluczy VAPID.
https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
Aplikacja kliencka wysyła obiekt rejestracji subskrycji za każdym razem gdy zainstaluje albo zauktualizuje service worker.
Aby wywołać w prosty sposób instalację SW najlepiej zatrzymać aktywny SW i przeładować stronę.
Za każdym razem gdy serwer otrzyma subskrycję powinień wysłać powiadomienie powitalne i zapisać subskrycję w bazie.


Kroki:
* dodanie zależności `web-push`
* stworzenie nowego pliku z kodem inicjalizującym `web-push`
  * wygenerowanie VAPID keys zdognie z linkiem powyżej
  * wykorzystanie metody `setVapidDetails` do inicjalizacji
  * dodanie importu pliku do `index.js`
* Dodanie SubscriptionModel, model zawiera pola na id użytwnika i dane subskrycji
* Dodanie do api metodę dodającą nową subskrycję użytkownika
  * argumentami tej metody są id użytwnika i dane subskrycji
  * metoda zwraca `_id` dokumnetu
* dodać do endpointu `/api/notifications` 
  * zapisanie nowej subskrycji użytkownika
  * wysłanie zwrotne powiadomienia na bazie zapisywanej subskrycji

[Rozwiązanie tego etapu](https://github.com/G3F4/warsawjs-workshop-31-calendar/compare/etap-3...etap-4)

### Etap 5 - cykliczne wysyłanie powiadomień

Na koniec zadbamy aby do każdego wydarzenia w kalendarzu, które ma aktywne powiadomienie, zostało wysłane powiadomienie.
Zadbać należy aby powiadomienia były jednorazowe - jedno per wydarzenia.
Do stworzenia joba wykorzystamy `agenda`, którą należy dodać do zależności.
Następnie musimy uruchomić środowisko oraz zdefiniować job do wykonania oraz określić jego cykl.

Kroki
* dodać do api metodę `deleteSubscription`
  * argument - id subskrycji
  * zwrotka - id subskrycji
* dodać do api metodę pobierającą wydzarzenia, które wymagają powiadomienia w danym momencie.
* dodać do zależności `agenda`
* stworzyć nowy plik na kod związany z `agenda`, dodać import do `index.js`
* zdefiniować timezone dla `moment-timezone`
* stworzyć nową istancję Agendy łącząć z bazą danych
* dodać nasłuchiwanie na event `ready`, wewnątrz eventu:
  * rozpocząć pracę Agendy
  * usunąć stare joby
  * zdefiniować job
    * powinien pobierać wszystkie wydarzenia, które wymagają powiadomienia
    * po wysłaniu do danego powiadomienia, aktualizujemy model wydarzenia, tak aby nie miał już aktywnych powiadomień
    * jeśli subskrycja jest zła - kasujemy ją
  * odpalić job w określonym intervale
* zadbać o odpowiednie zakończenie pracy Agendy

[Rozwiązanie tego etapu](https://github.com/G3F4/warsawjs-workshop-31-calendar/compare/etap-4...etap-5)
