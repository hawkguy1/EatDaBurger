$(function () {
    $(".devour").on("click", function (event) {
        let id = $(this).data("id");
        let isDevoured = $(this).data("devoured");
        let devouredState = {
            devoured: isDevoured
        };
        console.log(devouredState);

        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                console.log("changed devoured to", isDevoured)
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        let newBurger = {
            name: $("#burger").val().trim(),
            devoured: false
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                location.reload();
            }
        );
    });
});