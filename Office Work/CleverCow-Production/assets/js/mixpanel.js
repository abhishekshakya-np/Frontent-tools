import mixpanel from 'mixpanel-browser';
mixpanel.init(import.meta.env.VITE_MIX_PANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
});
mixpanel.identify('USER_ID');

// Track an event. It can be anything, but in this example, we're tracking a Sign Up event.
mixpanel.track('Sign Up', {
    'Signup Type': 'Referral',
});
