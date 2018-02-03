/**
*   GENERAL SCRIPTS FOR ENTIRE TRENDSTER.SITE
**/
function generalScripts() {

  //Animate loader off screen
  $("#preloader").fadeOut("slow");
  $("body").fadeIn("slow");

  /**
  *      NAV INITIALIZATION
  **/
  // Initialize sidenav button
  $(".button-collapse").sideNav();

  //Initialize modal
  $('.modal').modal();

}

function homeScript() {

  window.setTimeout(function(){

       $(".pageHeader").removeClass("scale-out");

  }, 200)

  window.setTimeout(function(){

       $("#getStarted").removeClass("scale-out");

  }, 800)

  window.setTimeout(function(){

       $("#readMore").removeClass("scale-out");

  }, 900)

  window.setTimeout(function(){

       $("#preamble div").fadeIn(1000);

  }, 1000)
}

function browseScript(){

      /**
      *       INITIALIZE PLUGINS
      **/

      // Initialize sidenav button
      $(".button-collapse").sideNav();

      // Initialize modal
      $('.modal').modal();

      // Initiliaze materialboxed
      $('.materialboxed').materialbox();

      window.setTimeout(function(){

        $(".card").removeClass("scale-out");

      }, 100)

}

function settingsScript() {

    //Initialize tabs...
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    $('.materialize-textarea').characterCounter();

    // Initialize chips
    $('.chips').material_chip();
    $('.chips-autocomplete').material_chip({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
      autocompleteOptions: {
        data: {
          'Athlete': null,
          'Sport': null,
          'Adventure': null,
          'Travel': null,
          'Blog': null,
          'Vlog': null,
          'Business': null,
          'Photography': null,
          'Film': null,
          'Cinematography': null,
          'Photos': null,
          'Comedy': null,
          'Sketch': null,
          'Play': null,
          'Theatre': null,
          'Acting': null,
          'Gaming': null,
          'Esport': null,
          'Hobbyist': null,
        },
        limit: Infinity,
        minLength: 1
      }
    });

    window.setTimeout(function(){

      $("#profile").removeClass("scale-out");

    }, 200)
}

/**
*   onRendered Functions:
**/

/**
*  401 ERROR
**/
Template.NoAccessLayout.onRendered(function() { generalScripts(); });

/**
*  HOME
**/
Template.HomeLayout.onRendered(function(){
  generalScripts();
  homeScript();
});

/**
*   ABOUT
**/
Template.AboutLayout.onRendered(function() { generalScripts(); });

/**
*  LOGIN / SIGN UP
**/
Template.LoginLayout.onRendered(function() {
   generalScripts();
   $('select').material_select();
 });

/**
*  DASHBOARD START
**/
Template.DashboardLayout.onRendered(function() { generalScripts(); });

/**
*  BROWSE
**/
Template.BrowseLayout.onRendered(function() { generalScripts(); browseScript(); });

/**
*  SETTINGS
**/
Template.SettingsLayout.onRendered(function() {

  generalScripts();
  settingsScript();

});

/**
*   SITEBUILDER
**/
Template.SiteBuilderLayout.onRendered(function() {

  generalScripts();  $('.parallax').parallax();
  settingsScript();  $('.carousel').carousel({dist:0, padding:50, shift:0, });

});

Template.templatePreview.onRendered(function() {

  generalScripts();
  $('.parallax').parallax();

});

Template.DevToolsLayout.onRendered(function() {

  generalScripts();
  $('select').material_select();

});

Template.EditPageLayout.onRendered(function() {

  generalScripts();
  $('select').material_select();
  $('.parallax').parallax();
  $('.collapsible').collapsible();

});
