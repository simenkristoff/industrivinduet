# Industrivinduet, NTNU Trondheim
> Open source frontend for **industrivinduet.no**
>
> Nettsiden er ikke deployert per dags dato, men en demo er tilgjengelig på denne [adressen](http://13.49.115.193/)
> 
> Ta kontakt på [mail](mailto:simekri@stud.ntnu.no?Subject=Tilgang%20til%20industrivinduet-admin) dersom du ønsker tilgang til admin-panelet og CMS

Nettside for bedriftskontakten til Produktutvikling og Produksjon (siv.ing. Maskin) på NTNU.

![Industrivinduet mockup](https://github.com/simenkristoff/industrivinduet/blob/main/mockup.jpg)

## Kommandoer
### Utvikling
Start server og klient i utviklingsmiljø

```node
$ npm run dev
```

Start klienten


```node
$ npm run client
```

Start server

```node
$ npm run server
```


### Produksjon
Bygger klienten for produksjon/deployment
```node
$ npm run build
```

Start serveren i produksjonsmiljø
```node
$ npm run prod
```

Kjører applikasjonen som en bakgrunnsprosess på NGINX-serveren ved hjelp av PM2
```node
$ pm2 start npm --name "industrivinduet" -- run prod
```

### Testing
Kjører tester med jest
```node
$ npm run test
```

### Kodestandard/linting
Linter all kode med eslint
```node
$ npm run eslint
```

Linter alle .scss filer med stylelint
```node
$ npm run stylelint
```

