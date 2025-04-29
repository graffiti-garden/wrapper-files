# Graffiti Files

This package exposes functions for converting [Files](https://developer.mozilla.org/en-US/docs/Web/API/File)
to and from [Graffiti objects](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html).

[See a running example](./example).

The conversion functions are:
- [`fileToGraffitiObject`](docs/functions/fileToGraffitiObject.html)
- [`graffitiObjectToFile`](docs/functions/graffitiObjectToFile.html)

This package also contains tooling for Vue that allows you to use
`graffitiObjectToFile` as either a
[renderless components](https://vuejs.org/guide/components/slots#renderless-components)
or a [composable](https://vuejs.org/guide/reusability/composables.html):
- [`useGraffitiObjectToFile`](docs/functions/useGraffitiObjectToFile.html)
- [`GraffitiObjectToFile`](docs/components/GraffitiObjectToFile.html)
