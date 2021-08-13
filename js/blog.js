let divBlog = $("#blogPost")

$(document).ready(function () {

    $('.nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    $("#navBar").fadeIn(3000);
    $('#navBar').addClass('d-flex', 'align-items-center')
    $("#title").fadeIn(2000);
    $("#subTitle").fadeIn(3000);


    function progresoScroll() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("progresoScroll").style.width = scrolled + "%";
    }

    window.onscroll = function () { progresoScroll() };

    window.addEventListener('scroll', function () {

        let header = $('.header')
        let navBar = $('.navbar')

        if (window.scrollY > 0) {
            header.css('position', 'fixed')
            header.css('box-shadow', 'rgb(49 49 49 / 10%) 0px 5px 15px 5px')
            navBar.css('transition', '.5s')
            navBar.css('animation', '.5s')
            navBar.css('height', '60px')
            navBar.css('background-color', 'rgb(27 27 27 / 86%)')
        } else {
            header.css('position', 'absolute')
            header.css('box-shadow', 'none')
            navBar.css('height', '90px')
            navBar.css('background-color', '#1b1b1b')
        }
    })

    const urlJson = "../blog.json"

    $.get(urlJson, function (data, status) {
        if (status === 'success') {
            for (let i = 0; i < data.length; i++) {
                divBlog.fadeOut(500, function () {
                    divBlog.append(
                        `
                        <div class="card hover-animated" style="width: 18rem;">
                        <img class="card-img-top" src=${data[i].img} alt="Card image cap">
                        <div class="card-body">
                            <div class="d-flex header-card">
                                <h5 class="card-title">${data[i].title}</h5>
                                <span class="likes">${data[i].likes} 🔥</span>
                            </div>
                          <p class="card-text">${data[i].body}</p>
                        </div>
                      </div>`
                    ).fadeIn(1000);
                })
            }
        }
    })
});
