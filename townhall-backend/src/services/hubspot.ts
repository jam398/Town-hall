const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com';

interface HubSpotContact {
  properties: {
    email: string;
    firstname: string;
    lastname: string;
    phone?: string;
    [key: string]: any;
  };
}

export const hubspotService = {
  async createOrUpdateContact(data: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    tags?: string[];
  }): Promise<string> {
    const { email, firstName, lastName, phone, tags } = data;

    const contactData: HubSpotContact = {
      properties: {
        email,
        firstname: firstName,
        lastname: lastName,
      },
    };

    if (phone) {
      contactData.properties.phone = phone;
    }

    try {
      // Try to create contact
      const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const result = (await response.json()) as { id: string };
        console.log('HubSpot contact created:', result.id);
        return result.id;
      }

      // If contact exists, update it
      if (response.status === 409) {
        return await this.updateContactByEmail(email, contactData.properties);
      }

      throw new Error(`HubSpot API error: ${response.statusText}`);
    } catch (error) {
      console.error('HubSpot error:', error);
      // Don't throw - just log. We don't want CRM failures to break registration
      return '';
    }
  },

  async updateContactByEmail(email: string, properties: any): Promise<string> {
    try {
      // Search for contact by email
      const searchResponse = await fetch(
        `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email,
                  },
                ],
              },
            ],
          }),
        }
      );

      const searchResult = (await searchResponse.json()) as {
        results: Array<{ id: string }>;
      };

      if (searchResult.results && searchResult.results.length > 0) {
        const contactId = searchResult.results[0].id;

        // Update contact
        await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({ properties }),
        });

        console.log('HubSpot contact updated:', contactId);
        return contactId;
      }

      return '';
    } catch (error) {
      console.error('HubSpot update error:', error);
      return '';
    }
  },

  async addContactToList(contactId: string, listId: string): Promise<void> {
    // This requires list ID - implement when you create lists in HubSpot
    try {
      await fetch(`${HUBSPOT_API_URL}/contacts/v1/lists/${listId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          vids: [contactId],
        }),
      });
    } catch (error) {
      console.error('Failed to add contact to list:', error);
    }
  },
};
