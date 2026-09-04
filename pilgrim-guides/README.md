# NoorLink pilgrim gift PDFs

Complimentary guides for customers **after they pay** (checkout success email / My eSIMs).

## Delivery (wired)
- **Primary:** QR / fulfillment email includes download links when the order looks like pilgrimage (Saudi / Umrah / Hajj / Saudi+ routes).
- **Secondary:** Success page shows the same three links for those orders (does not replace the QR).
- **Not attached** as email files — links only.

## Finished PDFs (ready to attach or host)

| File | Gift name |
| --- | --- |
| `public/guides/pilgrimage/noorlink-gift-duas-al-haramayn.pdf` | Duas for the Journey |
| `public/guides/pilgrimage/noorlink-gift-orientation-makkah-madinah.pdf` | Makkah & Madinah Orientation |
| `public/guides/pilgrimage/noorlink-gift-places-of-meaning.pdf` | Places of Meaning |

Public URLs (once deployed):

- `https://noorlink.co/guides/pilgrimage/noorlink-gift-duas-al-haramayn.pdf`
- `https://noorlink.co/guides/pilgrimage/noorlink-gift-orientation-makkah-madinah.pdf`
- `https://noorlink.co/guides/pilgrimage/noorlink-gift-places-of-meaning.pdf`

## Branding included
- NoorLink logo + wordmark (Noor teal / Link orange)
- Cover photos from pilgrimage imagery
- Gift line: **Complimentary gift with your purchase**
- Clear: not required for eSIM · not Nusuk/visa · personal offline use

## Rebuild after edits
```bash
./pilgrim-guides/build-pdfs.sh
```

Edit HTML in `pilgrim-guides/html/`, then rebuild.

## Suggested email wording (after payment)
> Assalamu alaikum — thank you for choosing NoorLink.  
> As a gift with your pilgrimage eSIM, here are three short guides to save on your phone before you fly:  
> 1) Duas for the Journey  
> 2) Makkah & Madinah Orientation  
> 3) Places of Meaning  
> They open offline. They are not required to use your eSIM.
