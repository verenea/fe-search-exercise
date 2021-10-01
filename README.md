# Search Page Exercise

A React SPA to demonstrate the ability to implement a basic search api exposed by the ([Algolia](https://www.algolia.com/)) search engine, and display the results.

## Get started

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see the app.


## Notes
Given the demo api-key ("search only?"), a number of features (ie. facets for filters, custom ranking, etc) that I was
looking to implement were unable to be configured. Those settings upon the target index appear to be managed via
an account dashboard or by using `index.setSettings()` (which is claimed to be inaccessible from the JS frontend client
version of the api -- will hopefully find out more).

- React-router is used in conjunction with `searchState` to enable search history quasi-routing.
- Material-UI 5.0 is integrated with connected components to enhance component design and functionality
- The latest version of React (17) was used, along with Hooks to manage component state
- A light/dark-mode theme toggle was added to demonstrate context/provider usage
- In lieu of a product image, which is preferable, a barcode was utilized for some graphical distinction

 
## Todo

- Convert hit details dialog to a Detail Page (based off of index)
- Connect Pager and PageSize dropdown components to a MUI-d version, as they're still the default InstantSearch version
- Integrate an `<aside>` element that will house proper filtering of Categories, Brand, Tags, etc.
- Get a better picture of capabilities/limitations for the provided exercise api key to see if faceted results are even possible
- Related to the previous bullet, the search rankings/results really need to be manipulated and configured to display more relevant hits
- Integrate Webpack for finer control of build-time settings, though the CRA react-scripts OOTB tandem work well for this scope
- Find out how to resolve the Image partial paths that are returned with search hits data
- Implement unit testing for components and expected behavior
