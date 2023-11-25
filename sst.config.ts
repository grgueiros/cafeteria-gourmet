import type { SSTConfig } from "sst";
import { RemixSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "cafeteria-gourmet",
      region: "us-east-1",
      profile: "grgueiros-dev"
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new RemixSite(stack, "site", {
        customDomain: {
          domainName: "cafeteria.gabrielgueiros.com.br",
          domainAlias: "www.cafeteria.gabrielgueiros.com.br",
          hostedZone: "gabrielgueiros.com.br"
        },
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
