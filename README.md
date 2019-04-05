## Etap 1 - początek pracy - routing

Serwer w tym stanie serwuje pliki statyczne z folderu `public`.
Po uruchomieniu serwera, aplikację można zobaczyć w przeglądarce pod adresem `localhost:5000`.
Pierwszym zadaniem, będzie dodanie routingu do serwera.
Na podstawie kontraktu API, opisanego w pliku README na branchu master, dodać należy wszystkie endpointy wykorzystywane przez klienta.
Na razie nie mamy danych, więc będziemy zwracać zamockowane dane w postaci odpowiadającej projektowi `api`.
Wszystkie endpointy warto zgrupować przy pomocy wspólnego routera.
Po prawidłowym dodaniu endpointów, nie powinniśmy widzieć błędów w konsoli Network w przeglądarce.

## Etap 2 - logowanie

Do logowania wykorzystamy `OAuth` ze strategią `GitHub`.
Potrzebne będą zależności `passport` oraz `passport-github`.
Rozwiązanie jjest oparte na sesji więc należy dodać do `express` obsługę sesji.
Wykorzystamy do tego zależność `express-session`.

## Etap 3 - baza danych

Do przechowywania danych użyjemy `MongoDB`. Jako sterownik posłuży nam `mongoose`.
Do pracy będziemy potrzebować 2 modeli i schem - `UserModel` oraz `EventModel`.
Wszystkie operacje na kolekcjach będziemy wykonywać przez moduł proxy `api`. 
Dzięki temu warstwa bazy danych zostanie wyraźnie odcięta od domeny serwera.
Następnie wykorzystamy nowe `api` do integracji z `apiRouter`.
