import { gql } from "@apollo/client";

export const GET_SITE = gql`
  query getSiteData($host: String!) {
    brd_list(
      where: {
        _or: [{ domain: { _eq: $host } }, { subdomain: { _eq: $host } }]
      }
    ) {
      domain
      id
      name
      subdomain
      thp_id
      brand_type
      brd_pages {
        page_heading
        title
        slug
        name
        page_sub_heading_2
        content_heading
        content_description
      }
      brd_details {
        logo
        primary_color
        secondary_color
        font
        footer_logo
        fav_icon
        hero_image
        author_company
        twitter_card_type
        twitter_site_handle
        twitter_creator_handle
        locale
        authority_link
        authority_number
        iata
        show_popup
        popup_time
        discount_in_percentage
        one_signal_id
      }
    }
  }
`;
