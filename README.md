## Etap 0 - początek pracy - routing

Serwer w tym stanie serwuje pliki statyczne z folderu `public`.
Po uruchomieniu serwera, aplikację można zobaczyć w przeglądarce pod adresem `localhost:5000`.
Pierwszym zadaniem, będzie dodanie routingu do serwera.
Na podstawie kontraktu API, opisanego w pliku README na branchu master, dodać należy wszystkie endpointy wykorzystywane przez klienta.
Na razie nie mamy danych, więc będziemy zwracać zamockowane dane w postaci odpowiadającej projektowi `api`.
Wszystkie endpointy warto zgrupować przy pomocy wspólnego routera.
Po prawidłowym dodaniu endpointów, nie powinniśmy widzieć błędów w konsoli Network w przeglądarce.
