$(document).ready(function () {
    prefillData()
});

$("#generate_link").click(function () {
    generateLink()
    clearLink()
})

function prefillData() {
    $("#tenure").val(getUrlParameter("t"))
    $("#interest_rate").val(getUrlParameter("i"))
    $("#loan_amount").val(getUrlParameter("l"))
    clearLink()
}

function clearLink() {
    const linkView = $("#link")
    linkView.hide()
    linkView.attr("href", "")
    linkView.text("")
}

function setLink(link) {
    const linkView = $("#link")
    linkView.attr("href", link)
    linkView.text(link)
    linkView.show()
}

function generateLink() {
    const data = {
        t: $("#tenure").val(),
        i: $("#interest_rate").val(),
        l: $("#loan_amount").val()
    }

    const queryParams = new URLSearchParams(data)
    var pathname = window.location.pathname
    if (!pathname.trim()) {
        pathname = "/"
    }
    const link = window.location.origin + pathname + "?" + queryParams

    shortenUrl(link)
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function shortenUrl(longUrl) {
    const postData = {
        dynamicLinkInfo: {
            domainUriPrefix: "tdclinkshortener.page.link",
            link: longUrl
        }
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(postData),
        dataType: 'json',
        success: function (data) {
            const link = data.shortLink
            setLink(link)
            console.log(link)
        },
        error: function () {
            console.log("Device control failed");
        },
        type: 'POST',
        url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDis1cF-gd24jBK0Uqgopts5lyLVUlccLo'
    });


}
