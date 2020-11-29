import React from 'react';
import ContentLoader from "react-content-loader";

function PizzaLoadingBlock() {
    return (
        <ContentLoader
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="8" y="303" rx="3" ry="3" width="236" height="71" />
            <rect x="8" y="265" rx="3" ry="3" width="236" height="28" />
            <circle cx="123" cy="123" r="123" />
            <rect x="9" y="390" rx="0" ry="0" width="81" height="25" />
            <rect x="32" y="416" rx="0" ry="0" width="8" height="2" />
            <rect x="27" y="414" rx="0" ry="0" width="5" height="0" />
            <rect x="139" y="386" rx="20" ry="20" width="104" height="36" />
        </ContentLoader>
    )
}

export default PizzaLoadingBlock
