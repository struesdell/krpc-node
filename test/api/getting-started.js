'use strict';
require('../init');
let { createClient, spaceCenter } = require('../../lib/client');

describe('Getting Started - async', function() {
    it('Should work', async function() {
        this.timeout(10000);
        const client = await createClient();
        try {
            let vessel = await client.send(spaceCenter.getActiveVessel());
            let control = await vessel.control.get();
            let orbitalReference = await vessel.orbitalReferenceFrame.get();
            let flight = await vessel.flight(orbitalReference); //client.send(spaceCenter.vesselFlight(vesselId, orbitalReference));
            let getThrottleCall = spaceCenter.controlGetThrottle(control.id);
            let getHeadingCall = spaceCenter.flightGetHeading(flight.id);
            let response = await client.send([getThrottleCall, getHeadingCall]);
            console.log({
                throttle: response.results[0].value,
                heading: response.results[1].value
            });
        } catch (err) {
            await client.close();
            throw err;
        }
        await client.close();
    });
});
