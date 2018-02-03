/**
*   Redirects to 401 if not logged in...
**/
function checkAccess(layoutName) {

  if ( Session.get("id") ) {
    BlazeLayout.render(layoutName); //Render
  } else {
    FlowRouter.go("401");
  }

}

/**
*   ALL ROUTES: The link pipeline.
**/
FlowRouter.route('/', {
    name: 'home', //Reference name
    action() {  //What actually happens.

        // Clear Session. (Clears all keys/cells)
        Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); })
        Session.keys = {}

        BlazeLayout.render('HomeLayout'); //Render our HomeLayout as soon as we route to /home
    }
});

FlowRouter.route('/about', {
    name: 'about', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('AboutLayout'); //Render
    }
});

FlowRouter.route('/login', {
    name: 'login', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('LoginLayout'); //Render
    }
});

FlowRouter.route('/dashboard', {
    name: 'dashboard', //Reference name
    action() {  //What actually happens.
      checkAccess("DashboardLayout");
    }
});

FlowRouter.route('/browse', {
    name: 'browse', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('BrowseLayout'); //Render
    }
});

FlowRouter.route('/settings', {
    name: 'settings', //Reference name
    action() {  //What actually happens.
      checkAccess("SettingsLayout");
    }
});

FlowRouter.route('/401', {
    name: '401', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('NoAccessLayout'); //Render
    }
});

FlowRouter.route('/sitebuilder', {
    name: 'sitebuilder', //Reference name
    action() {  //What actually happens
      checkAccess("SiteBuilderLayout");
    }
});

FlowRouter.route('/preview', {
    name: 'templatePreview', //Reference name
    action() {  //What actually happens
      checkAccess("templatePreview");
    }
});

FlowRouter.route('/uploadForm', {
    name: 'uploadForm', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('uploadForm'); //Render
    }
});

FlowRouter.route('/devtools', {
    name: 'devtools', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('DevToolsLayout'); //Render
    }
});

FlowRouter.route('/edit', {
    name: 'edit', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('EditPageLayout'); //Render
    }
});
