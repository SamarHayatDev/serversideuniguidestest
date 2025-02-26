"use client";

import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

interface ApolloProviderContextProps {
  children: ReactNode;
}

const ApolloProviderContext: React.FC<ApolloProviderContextProps> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderContext;
