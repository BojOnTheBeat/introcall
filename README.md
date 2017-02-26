# Introcall
Uber for professional introductions.

Talk to a human.™

## Team
- Isa Hassen
- Bolaji Fatade

## Description

A web service where you pay to talk to famous or talented people for 25 minutes.
Think of it is a professional Tinder, or Uber for networking. Anyone can
sign up to be a "consultant", and after being approved, you can earn an income
just by getting on the phone with people who want to talk to you.

The app will have to handle the profile creation, scheduling, voice/video
calling, and a rating/reputation system to make the Introcall process work
smoothly.

What makes Introcall different from 10k Coffees and other networking/social
websites is that is a *paid* service, intended to create income streams for
people from all walks of life, while giving others a chance to expand their
professional network.

## Beta features

These are the MVP features which need to be working by Mar 12.

- user sign up and login (through the LinkedIn API only)
- two separate dashboards for logged-in users: "consultant profile" and "client profile"
- ability to edit consultant profile with picture, text description, keywords,
current location and timezone
- ability to edit client profile with picture, location, text description,
current location and timezone
- infinite-scrolling homepage with listing of profiles of people to talk to
- search for profiles by keywords, filter by location, and filter by availability
 for a particular date/time
- realtime Call page: clients and consultants can join a room with video calling
(however scheduling/booking the call will not be implemented yet)

## Final features

- Timekit.io booking/scheduling integration
  - ability for consultants to specify their availability by creating timeslots
on specific days, or recurring timeslots by week/month
  - client scheduling form: clients select time/date of call (must take into account 
consultant availability and timezone differences)
- realtime Call page with text chat (and notifications)
- relevant profiles algorithm: similar to Facebook's feed algorithm, we will
  need to come up with an algorithm that uses analytics/location data to suggest
  relevant people that you might want to connect with (and show those profiles
  on the front page)

## Tech Stack

- Full Stack Meteor.js (Node, Mongo, Blaze)
- Passport.js for authentication
- Twilio API for live audio/video calls
- Timekit.io for booking/scheduling integration

#### future additions

- Stripe API for payments
- Segment.io for analytics
- Sentry for JS error monitoring
- Intercom for customer support

## Tech Challenges

- Building a realtime chat room with live video calling and in-app messaging, 
that works seamlessly on both mobile and desktop
- Learning the Meteor.js Full Stack Framework, and adapting it to special use
cases, like a live video call page
- Integrating lots of external APIs (Timekit, LinkedIn, Twilio, Stripe, 
Segment, etc.)
- learning a developing a "relevancy" algorithm, similar to Google's Adwords
  and Facebook's feed algo.