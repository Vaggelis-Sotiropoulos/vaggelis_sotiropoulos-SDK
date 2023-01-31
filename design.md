The design of this sdk is as follows:
Models are included in order to ensure the type of response
- The models for the response are given their own files and folder for extensibility purposes

The client is where actual calls are made.
- The functions in the client call the API where responses are type checked and error is returned if the API returns an error
