export type ComponentFilter = Component[];

export type Summary = {
    page: SummaryPage
}

export type SummaryPage = {
    name: string;
    status: string;
    url: string
}

export type Component = {
    id: string;
    name: string;
    nameTranslationId: string;
    description: string;
    descriptionTranslationId: string;
    status: string;
    order: number;
    showUptime: boolean;
    createdAt: string;
    updatedAt: string;
    archivedAt?: any;
    siteId: string;
    uniqueEmail: string;
    oldGroup?: any;
    groupId: string;
    isParent: boolean;
    isCollapsed: boolean;
    monitorId?: any;
    nameHtml: string;
    nameHtmlTranslationId: string;
    descriptionHtml: string;
    descriptionHtmlTranslationId: string;
    isThirdParty: boolean;
    thirdPartyStatus: any;
    thirdPartyComponentId: any;
    thirdPartyComponentServiceId: any;
    importedFromStatuspage: boolean;
    startDate: any;
    thirdPartyComponentService: any;
    metrics: any[];
    children: Children[] | [];
    translations: any;
}

export type Children = {
    id: string;
    name: string;
    nameTranslationId: string;
    description: string;
    descriptionTranslationId: string;
    status: string;
    order: number;
    showUptime: boolean;
    createdAt: string;
    updatedAt: string;
    archivedAt: any;
    siteId: string;
    uniqueEmail: string;
    oldGroup: any;
    groupId: string;
    isParent: boolean;
    isCollapsed: boolean;
    monitorId: any;
    nameHtml: string;
    nameHtmlTranslationId: string;
    descriptionHtml: string;
    descriptionHtmlTranslationId: string;
    isThirdParty: boolean;
    thirdPartyStatus: any;
    thirdPartyComponentId: any;
    thirdPartyComponentServiceId: any;
    importedFromStatuspage: boolean;
    startDate: boolean;
    thirdPartyComponentService: any;
    metrics: any[];
    children: any[];
    translations: any[];
}