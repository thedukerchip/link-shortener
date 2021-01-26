$(document).ready(function () {
    prefillData()
});

$("#generate_link").click(function () {
    generateLink()
})

function prefillData() {
    $("#tenure").val(getUrlParameter("t"))
    $("#interest_rate").val(getUrlParameter("i"))
    $("#loan_amount").val(getUrlParameter("l"))
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

    console.log("Link : " + link)
    // $("#link").attr("href", link)
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
    $.post(
        "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDis1cF-gd24jBK0Uqgopts5lyLVUlccLo",
        postData,
        function (data) {
            console.log(data)
        }
    );

}
