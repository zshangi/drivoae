import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GiCarWheel, GiCarBattery, GiMechanicGarage } from "react-icons/gi";


///////////////////////////////////////////////////////////////////////

const theme = createTheme();

export default function FaqScreen({ history }, props) {
  return (
    <Container>

      <Helmet>
        <meta charSet="utf-8" />
        <title>FAQ</title>
        <meta name="description" content="FAQ" />
      </Helmet>
      <h1>FAQ</h1>
      <div style={{ height: '100%' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What's My Tire Size, and How Do I Find It?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Unraveling the Mystery of Tire Dimensions<br />
              If you're scratching your head trying to decode the jargon on your tire's sidewall, you're not alone. Understanding your tire size is crucial for safety, performance, and of course, making informed purchases. Here's how to decipher it:
              <br />1.	Width: The first three digits indicate how wide the tire is in millimeters.
              <br />2.	Aspect Ratio: The two numbers following the slash are the tire's aspect ratio, which tells you its height relative to its width.
              <br />3.	Rim Size: After the letter "R," you'll find the size of the wheel rim in inches.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> How Do I Order the Right Tires for My Vehicle?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              A Smooth Ride to Your Perfect Tire Match<br />
              Ordering tires can seem complicated, but we've streamlined the process to make it as straightforward as possible.
              <br />1.	Identify Your Size: Use our "Tire Size Translator" to determine the right size for your vehicle.
              <br />2.	Browse and Choose: Navigate through our curated selection of tires that fit your size and driving needs.
              <br />3.	Add to Cart: Once you've made your selection, click "Add to Cart."
              <br />4.	Review and Confirm: Head to your cart to review your choices, then proceed to the checkout.
              <br />5.	Set Your Location and Service: At this stage, you can set your location and choose whether you'd like to visit a service center, use a mobile service, or opt for shipping only.
              <br />6.	Finalize the Details: Schedule a time slot that works for you and proceed with payment.

            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> Can I Get My Tires Installed Today?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Fast-Track Your Installation: Here's How<br />
              Good news: While our online booking system shows a one-day lag for available time slots, many installations actually take place on the very same day you order!
              <br />The speed of your installation really boils down to two factors:
              <br />1.	The Installer's availability
              <br />2.	The location of the tires you've chosen
              <br />For instance, if your selected tires are stocked in our Dubai warehouse and your chosen installer is also based in Dubai, the odds are in your favor for same-day installation. If not, you'll likely be looking at next-day service.
              <br />Want to seal the deal on same-day installation? The surefire way is to give us a call at 044277477 or reach out through the WhatsApp chat on our homepage. This allows us to quickly confirm both tire and installer availability for you.
              <br />Pro Tip: The earlier in the day you reach out to us, the higher the likelihood of locking in a same-day appointment.


            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What Is Wheel Alignment and Do I Really Need It?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Straight Talk: Why Wheel Alignment Matters
              <br />
              Think of wheel alignment as your car's chiropractic adjustment; it may not seem crucial until you start noticing issues. While it's easy to overlook, a proper wheel alignment should be part of your car's routine maintenance.
              <br />When Do I Need It?
              You'll likely need a wheel alignment if:
              <br />
              <br />
              1.	Your tires show uneven or accelerated wear.
              <br />

              2.Your car drifts or pulls even when you're driving straight.
              <br />
              3.	Your steering wheel is tilted when driving in a straight line.
              <br />
              Regularly getting your wheel alignment checked—at least once a year—can improve your tire life, save you fuel, and ensure a safer drive.


            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What Does It Involve?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              The process adjusts your wheels so they're parallel to each other and perpendicular to the ground. This promotes optimal tire longevity and fuel efficiency.
              Heads-Up on Wheel Health<br />
              Technicians will first examine your car for any worn or loose components in the front-end suspension. If issues are found, you'll be notified before the alignment process begins.
              Four-Wheel vs Two-Wheel Alignment<br />
              For precision, opt for a four-wheel alignment, especially if your car has adjustable rear alignment settings. This comprehensive check can uncover any rear tracking issues, allowing technicians to compensate by making front-wheel adjustments.
              Post-Alignment Check<br />
              After the alignment is completed, take your car for a spin on a straight, level road to ensure it drives straight and the steering wheel sits level. If something feels off, don't hesitate to bring it back for a fine-tuning.
              Pro Tip: The earlier you catch alignment issues, the more you'll save on tire replacements and fuel in the long run.


            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> How Do I Find the Nearest Installer to My Location?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Your Route to the Closest Service, Simplified
              Wondering where the closest installer is? Don't worry, we've got you covered! Once you've added your desired tires to the cart, you'll be prompted to drop a pin on your location via our interactive map.
              How It Works:<ul>


                <li>1.	Add to Cart: After choosing your tires, proceed to the next step.</li>
                <li>2.	Pin Your Location: You'll be asked to pinpoint your exact location on our map.</li>
                <li>3.	Choose Your Service: If you select the 'Service Center' option for receiving the tires...</li>
                <li>4.	Voila! We'll instantly show you the nearest service center based on your pinned location.</li>
                <li>It's as easy as that! No more scrolling through endless lists or typing zip codes—our system finds the most convenient installer near you.
                  Pro Tip: Opting for a service center close to your location not only saves time but can also cut down on any additional transportation costs.
                </li></ul>

            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What Is Wheel Balancing and Why Is It So Important?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Smooth Operator: The Lowdown on Wheel Balancing<br />
              Imagine steering a shaky, vibrating car down the highway—it's neither comfortable nor safe. That's what you're risking without proper wheel balancing. This process ensures that your tires and wheels spin smoothly, without any wobbling or vibrations.
              The Nuts and Bolts of It
              Wheel balancing involves identifying heavy spots on your wheel-tire combo and counterbalancing them with calibrated lead weights. This helps eliminate any vibrations when you hit certain speeds—generally between 80 and 120 km/h.
              Red Flags to Look For:
              <ul>
                <li>1.	Steering Wheel Vibration: Feeling a quiver in the steering wheel at highway speeds? That's a tell-tale sign.</li>
                <li>2.	Floorboard or Seat Shakes: If your seat or floorboard vibrates at certain speeds, you've likely got an imbalance.</li>
                <br />
                Even a minor imbalance—say, 10 or 20 grams—can cause a noticeable shake, especially when cruising around 100 km/h. Many drivers are stunned by how much smoother their ride feels post-balancing.
                s<br />Why It Matters<br />
                Over time, imbalances can lead to premature tire wear, decrease fuel efficiency, and compromise your safety. Plus, let's face it, a smoother drive is just more pleasant. Hitting a pothole can sometimes knock off a wheel's lead weight, causing an imbalance. If you've recently hit a rough patch, it might be time for a check-up.
                Pro Tip: If you're ever in doubt, especially after a jarring drive or pothole encounter, it's better to be safe and get your wheels balanced.
              </ul>

            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What's Included in the Price of a Tire on Drivo.ae?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              All-Inclusive: No Surprises, Just Value<br />
              When you shop for tires on Drivo.ae, you're getting an all-inclusive package. The price displayed for each tire includes:
              <ul>
                <li>
                  1.	5% VAT: No hidden taxes, the 5% Value Added Tax is built into the price.</li>
                <li>
                  2.	Delivery to Installer: We handle the logistics to get your new tires to the chosen installer.</li>
                <li>

                  3.	Installation: Each new tire comes with a standard new valve as part of the installation.</li>
                <li>4.	Balancing: High-quality weights are used to ensure your wheels are balanced to perfection.</li>
                <li>5.	Old Tire Disposal: Eco-friendly disposal of your old tires is part of the deal.</li>
              </ul>
              Bulk Purchase Benefits:
              <br />
              Order 4 or more tires and we'll throw in a visual wheel alignment inspection. If we spot an issue, alignment can be corrected at an additional cost. Plus, we offer a single tire rotation service every 10,000 km for up to one instance per year.
              Specialized Service Charges:<br />
              For those with unique wheel setups, such as Center or Bead Lock wheels, extra service charges apply. If your vehicle uses Tire Pressure Monitoring Systems (TPMS), new valves will also incur additional costs. For any specialized needs, feel free to reach out to us.
              <br />Pro Tip: Always check your vehicle's wheel alignment when installing new tires to maximize tire lifespan and performance.


            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What Payment Options Are Available on Drivo.ae?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Secure & Varied: Tailoring to Your Convenience<br />
              When it comes to payment, we aim to provide a variety of secure options to suit your needs. You can complete your purchase on Drivo.ae using the following credit/debit card networks:

              <ul>
                <li>1.	American Express</li>
                <li>2.	China UnionPay (CUP)</li>
                <li>3.	Discover & Diners Club</li>
                <li>4.	eftpos Australia</li>
                <li>5.	Japan Credit Bureau (JCB)</li>
                <li>6.	Mastercard</li>
                <li>7.	Visa</li>
              </ul>
              Note on Cash Payments:<br />
              As of now, we don't support cash payments. However, we're in the process of implementing a solution for cash transactions.
              Order Processing & Cancellation:<br />
              Your order moves into the processing stage only once we've successfully received or assured your payment. If an order remains unpaid, it will be automatically deleted from our system after 5 days from the initial placement date.
              <br />Pro Tip: Using a credit/debit card not only expedites the process but also offers an extra layer of security for your transactions.

            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> Can I Pay Cash at the Installer?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Digital Payments Only: Here's Why<br />
              As much as we value flexibility, cash payments are not an option at the installer. The only approved methods to complete your transaction on Drivo.ae include the following credit/debit card networks:
              <br />1.	American Express<br />
              2.	China UnionPay (CUP)<br />
              3.	Discover & Diners Club<br />
              4.	eftpos Australia<br />
              5.	Japan Credit Bureau (JCB)<br />
              6.	Mastercard<br />
              7.	Visa<br />
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> Why No Cash at the Installer?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Drivo.ae operates as an independent, multi-brand tire retailer, in partnership with various installers for service delivery. The tires you get installed are supplied by us and are shipped to the installer only after we've received and confirmed your payment.
              <br />Pro Tip: For a smooth and hassle-free experience, ensure you've successfully completed the payment online before heading to the installer.

            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What's the Ideal Date of Production (DOT) for Tires I Purchase?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Understanding DOT & Regulatory Guidelines<br />
              In compliance with UAE's Emirates Authority for Standardization and Metrology (ESMA), the rule is straightforward: tires with a Date of Production (DOT) older than 5 years are not permitted for use.
              New or Slightly Aged: What's the Verdict?<br />
              If your source is legitimate, a tire that was manufactured one or two years ago is generally acceptable. Contrary to popular belief, a tire's aging process doesn't initiate from its DOT, but from the moment it's inflated and fitted onto a vehicle. Research studies, such as one conducted in Saudi Arabia, found negligible performance differences between brand-new tires and those left unused for up to three years.
              Know Your Driving Habits<br />
              If you clock 30-40,000 kms per year on your car, a 2-year old tire should give you full service life before reaching ESMA's 5-year usage limit. In the UAE, you can often snag older DOT tires at a more attractive price. So, if you're a frequent driver, you can maximize value by opting for an older DOT.
              The Bottom Line<br />
              The key is to fully utilize the tire within ESMA's 5-year guideline, starting from its DOT. As long as you abide by that, you're good to go with any manufacturing date.
              <br />Pro Tip: Make the most of your tire purchase by aligning it with your driving habits and the local regulations. This way, you don't just save money but also stay compliant with safety standards.

            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> How Can I Determine If It's Time for New Tires?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Lifespan Variables: It's Not Just About Mileage<br />
              The longevity of your tires is influenced by multiple factors, including installation quality, design, your driving style, as well as climate and road conditions. So, there isn't a one-size-fits-all answer, but here are some indicators:
              <br />Monitor Tread Depth & Visible Wear<br />
              If the tread is visibly diminished, or you notice cracks and other signs of wear, that's your cue to replace them.
              Regular Inspections after the 3-Year Mark<br />
              After three years of use, it's prudent to have your tires professionally inspected every few months. The Road and Transport Authority's annual vehicle registration renewal service will also check the condition of your tires and notify you if they need replacement.
              <br />5-Year Rule: No Exceptions<br />
              UAE regulations mandate that tires, including spares, be replaced five years from their manufacturing date—regardless of appearance or tread depth.
              <br />Extend Tire Life Through Proper Care<br />
              Regular maintenance can go a long way. Maintain the correct air pressure, regularly rotate your tires, and stay up-to-date with vehicle maintenance to maximize tire longevity.
              <br />Pro Tip: Don't overlook your spare tire; it's subject to the same five-year rule and should be inspected regularly.

            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='fontflexible'><GiCarWheel color={'#61dafb'} /> What Does "Original Equipment" (OE) Tires Mean?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className='fontflexible'>
              Factory-Installed Tires<br />
              "Original Equipment" or OE tires refer to the set of tires that come installed on your vehicle straight from the manufacturer's assembly line.
              Custom-Engineered for Your Vehicle<br />
              Vehicle manufacturers often collaborate with tire companies to design tires that are tailored to accentuate a vehicle's performance and handling characteristics. For instance, a luxury sedan might be equipped with tires focused on providing a smooth, quiet ride, while a sports car might have tires designed for optimal grip and fast cornering.
              <br />Beyond Just Rubber: A Match Made in Automotive Heaven<br />
              So when you see "OE" next to a tire, understand that it isn't just any tire. It has been specifically engineered to complement your vehicle in a variety of aspects—be it fuel efficiency, noise levels, or handling dynamics.
              <br />Pro Tip: While OE tires are a safe bet for maintaining the intended driving experience of your vehicle, there are plenty of aftermarket options that may suit your specific needs better, especially as tire technology advances.

            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>





      <br />
      <br />
      <br /><br /><br />
    </Container>

  );
}


