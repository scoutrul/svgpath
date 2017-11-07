let padding = 10;

const drowPath = (source, target, linkId) => {

    const findSides = (source, target) => {

        const pointPosition = (node) => {
            return {
                leftX: node.offsetLeft - padding,
                rightX: node.offsetLeft + node.offsetWidth + padding,
                Y: node.offsetTop + node.offsetHeight / 2,
                X: node.offsetLeft + node.offsetWidth / 2
            }
        }

        if (pointPosition(source).X === pointPosition(target).X) {
            console.log('===')
        } else if (pointPosition(source).X > pointPosition(target).X) {
            console.log('>')

        } else if (pointPosition(source).X < pointPosition(target).X) {
            console.log('<')
        }
    };


    let sourceSide = findSides(source, target);


    // create svg path
    const findBezier = (source, target, sourceSide) => {

    };
    const SVG = (source, target) => {



        // let SVGpath = {
        //     "M" +
        //     (source.x) + "," + (source.y) + " " +
        //     // "C" +
        //     // (divCright.x) + "," + (divCright.y) + " " +
        //     // (target.right.x) + "," + (bezier.target.right.y) + " " +
        //     (target.x) + "," + (target.y);
        // }
    }


    const render = (linkId) => {
        linkId.setAttribute("d", SVG(source, target));
        findBezier(source, target, sourceSide)
    }
    return render(linkId)

};

export default drowPath;