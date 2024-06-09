# ClassifyEmails

App to classify emails into categories.

## Run Locally

To run the app locally, first clone this repo.

- After cloning, `cd` into `classify-emails` and run `npm install`.
- Create a `.env.local` file in the root directory.
- Add all the required environment variables to the `.env.local` file.
```
AUTH_GOOGLE_ID=<your_google_client_id>
AUTH_GOOGLE_SECRET=<your_google_client_secret>
AUTH_SECRET=<random_generated_secret>
SIGN_IN_REDIRECT_URI=<your_redirect_uri>
SIGN_OUT_REDIRECT_URI=<your_redirect_uri>
```
- Run `npm run dev` to start the app in development mode.


## Tech Stack

- Next.js 14
- Auth.js
- LangChain
- Gemini AI
- Shadcn
- Tailwind CSS
