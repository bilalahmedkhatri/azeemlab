import React from 'react';
import Script from 'next/script';

interface JSONLDProps {
  data: Record<string, unknown>;
}

export const JSONLD: React.FC<JSONLDProps> = ({ data }) => {
  return (
    <Script
      id="json-ld-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};
