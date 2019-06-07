This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You know the deal:

- Install deps: `yarn`
- Run tests: `yarn test`
- Start app in dev mode: `yarn start`.

Runs in modern browsers and IE10+. Tested in VoiceOver on Mac.

I've made an effort to create meaningful, separated commits - please see [the commit trail](https://github.com/itsravenous/booking/commits/master) for notes and rationale on each step.

# Next steps
I've limited myself to a few hours dev time. If I were building this in earnest,
the following would be some areas for improvement:

- Add more detail to search results (currently just displaying location name and
  IATA code if present)
- Create a custom hook to collapse the two state changes that happen when
  entering a search term (`setSearchTerm` and `setResults`)
- Refactor the PickupSearchResults component further for readability and
  separation of concerns
- Set the API url via an env var (https://12factor.net)
- Add integration tests against App.js. I omitted these because as there are no
  other components they would look _very_ similar to the `PickupSearchResults`
  tests
- Debounce the search API calls
- Test in other screen-readers
- Think more about the styling architecture


