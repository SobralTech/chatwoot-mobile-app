import { inboxSupportsReplyTo, isAWahaChannel, isAWhatsAppChannel } from '../inboxUtils';
import { Inbox } from '@/types/Inbox';

const inbox = (channelType: Inbox['channelType'], medium = ''): Inbox => ({
  id: 1,
  avatarUrl: '',
  channelId: 1,
  name: '',
  channelType,
  phoneNumber: '',
  medium,
});

describe('WAHA inboxes', () => {
  it('recognizes WAHA as a WhatsApp channel', () => {
    const waha = inbox('Channel::Waha');
    expect(isAWahaChannel(waha)).toBe(true);
    expect(isAWhatsAppChannel(waha)).toBe(true);
    expect(isAWahaChannel(inbox('Channel::Whatsapp'))).toBe(false);
    expect(isAWhatsAppChannel(inbox('Channel::TwilioSms', 'sms'))).toBe(false);
  });

  it('supports replying to incoming and outgoing messages', () => {
    expect(inboxSupportsReplyTo(inbox('Channel::Waha'))).toEqual({
      incoming: true,
      outgoing: true,
    });
  });
});
