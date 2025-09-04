<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
     integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

Remove the first Bootstrap CSS link (line 4) and keep this one with the integrity and crossorigin attributes.

Essential if you want to use Bootstrap. This is the main stylesheet that makes Bootstrap work on your page.
The integrity attribute improves security by ensuring that the resource wasn’t tampered with.

<link href="https://getbootstrap.com/docs/5.3/assets/css/docs.css" rel="stylesheet">

Not needed for your project. You can safely remove it unless you're replicating something from the Bootstrap documentation.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">

Optional, but necessary if you're using Bootstrap Icons.


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"

 Essential if you're using Bootstrap's JavaScript components. It allows for interactivity and dynamic behavior for components like modals, tooltips, and dropdowns.




 
    <!-- Bootswatch Theme (Cosmo) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/cosmo/bootstrap.min.css">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/fontawesome.min.css">

    <!-- Bootstrap Icons (optional) -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css">

    <!-- Bootlint for Error Checking -->
    <script src="https://maxcdn.bootstrapcdn.com/bootlint/latest/bootlint.min.js"></script>

    <!-- Custom Styles -->
    <link rel="stylesheet" href="style.css">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

