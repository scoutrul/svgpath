var drawConnector = function() {

    var divA = document.querySelector("#id1");
    var divB = document.querySelector("#id2");
    var divC = document.querySelector("#id3");
    var divD = document.querySelector("#id4");
    var linkA = document.querySelector("#_1");
    var linkB = document.querySelector("#_2");
    var linkC = document.querySelector("#_3");
    var linkD = document.querySelector("#_4");



    var getPosition = (id, position) => {
        if (position === 'left') {
            return {
                x: id.offsetLeft - 8,
                y: id.offsetTop + id.offsetHeight / 2
            }
        } else if (position === 'right') {
            return {
                x: id.offsetLeft + id.offsetWidth + 8,
                y: id.offsetTop + id.offsetHeight / 2
            }
        }
    };

    var divAleft = getPosition(divA, 'left');
    var divAright = getPosition(divA, 'right');

    var divBleft = getPosition(divB, 'left');
    var divBright = getPosition(divB, 'right');

    var divCleft = getPosition(divC, 'left');
    var divCright = getPosition(divC, 'right');

    var divDleft = getPosition(divD, 'left');
    var divDright = getPosition(divD, 'right');



    var linkCpath =
        "M" +
        (divCright.x) + "," + (divCright.y) + " " +
        "C" +
        (divCright.x + 100) + "," + (divCright.y) + " " +
        (divDleft.x - 100) + "," + (divDleft.y) + " " +
        (divDleft.x) + "," + (divDleft.y);

    linkC.setAttribute("d", linkCpath);

    var linkDpath =
        "M" +
        (divCleft.x) + "," + (divCleft.y) + " " +
        "C" +
        (divCleft.x - 100) + "," + (divCright.y) + " " +
        (divBright.x + 100) + "," + (divBright.y + 10) + " " +
        (divBright.x + 10) + "," + (divBright.y + 10);

    linkD.setAttribute("d", linkDpath);


    var dStrLeft =
        "M" +
        (divAleft.x) + "," + (divAleft.y) + " " +
        "C" +
        (divAleft.x - 100) + "," + (divAleft.y) + " " +
        (divBleft.x - 100) + "," + (divBleft.y) + " " +
        (divBleft.x) + "," + (divBleft.y);

    linkA.setAttribute("d", dStrLeft);

    var dStrRight =
        "M" +
        (divBright.x) + "," + (divBright.y) + " " +
        "C" +
        (divBright.x + 100) + "," + (divBright.y) + " " +
        (divAright.x + 100) + "," + (divAright.y) + " " +
        (divAright.x) + "," + (divAright.y);

    linkB.setAttribute("d", dStrRight);
}

export default drawConnector;