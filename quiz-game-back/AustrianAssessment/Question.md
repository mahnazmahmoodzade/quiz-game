- The application can obtain the data from the OpenTrivia API
   (https://opentdb.com/api_config.php). Data retrieval must be done via an HTTP
   request and must be processed to include them in the trivia game.

- The application must have a login screen (Just access code, no user/password)
   validated in the backend, a JWT must be returned by the backend and stored
   by the frontend.

- Backend should deny all requests of the category “Sports” based on the scopes
   contained in the JWT. The response must be 403 - Forbidden

- The application must allow the user to answer trivia questions. The trivia game
   should include questions and answers and should offer scoring for correct
   answers obtained.

- The application must allow the user to change categories during the game
   session.

- The application must allow the user to see their current game status and final
   game result.

- The application must follow the principles of clean and elegant design, with a
   good choice of colors, typography, and layout of elements. The application
   must follow basic principles of usability.

- The application must be viewable during the interview. The application can be
    shown via localhost or any hosting service, if desired