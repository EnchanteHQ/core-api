## Inspiration

During these pandemtic situations, going to events was always a convern for people. Especially because they had to physically interact to make any sort of transactions.

To prevent this and increase footfalls in events, we present to you Enchanté, A one-stop solution for everything in-event.

## What it does?

Enchanté reinvents traditional payment methods in such a way that is usable as well as futuristic for Events and Payments that utilize Augmented Reality and Real-Time Location to optimize an average event experience. Our main features as of now are:

- Single Click Payment powered by Augmented Reality.
- Eazy navigation through the venue on the app where you can find other where attendees in the event are.
- Get personalized event recommendations and book them right from the app.
- Connect and remember people you met in an event without the hefty business cards

## How we built it?

![Enchanté Tech Stack](https://i.ibb.co/nQ06dhS/tech-Stack.png)

This app is 100% written in pure Kotlin following the industry MVVM architecture pattern in codebase, used with proper Android Architecture and Jetpack Components. Utilized Koin for dependency injection, the app additionally leverages Google AR Core, Google Maps and, Nearby API for Augumented Reality, Location and, Map services.

The Backend is written in Node Typescript using MVC architecture and leverages MongoDb for the database.

We have used the power of Rapyd API and SDK for the payment network.

The product design and ideation was done on Figma and Figjam.

## Challenges we ran into

- The Location services in mobile devices are not accurate enough to get an accuracy under 5 meters.
- Creating a _usable_ futuristic augmented reality solution for payments was difficullt as most of the devices do not have quick response times.
- The database was just 1 CNF and had a lot of inconsistency initially which had to be handled in the most efficient way possible

## Accomplishments that we're proud of

- Building a ready to launch product in such a short duration of time.
- Building usable and easy to use Augumented Reality based payments.
- Building state of the art location based real-time updates to an accuracy of 10m.

## What we learned?

- Ideation for a market ready buisness product.
- Applications of FinTech in daily life.
- Integration of Third Party Payment(Rapyd) SDKs and APIs.

## What's next for EnchanteHQ?

- Marketing our product to event organisers
- We also want to implement a Peer to Peer payment directly even if the users are not a part of the event
- These features will make our already state-of-the-art app completely ready for the end-user
