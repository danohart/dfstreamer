export default function Fundraiser(props) {
  return (
    <div className='fundraiser'>
      <div className='fundraiser-inner'>
        <h2 className='fundraiser-title'>Give To Peoria Mutual Aid</h2>
        Peoria Mutual Aid Network is a Peoria-based network of concerned and
        caring citizens who want to prioritize the needs of traditionally
        marginalized people who are most in need of aid. They believe this is a
        time to lift each other up and create new lines of support to build
        strong, just, and resilient communities.
        <h3>Ways to give</h3>
        <div className='fundraiser-give'>
          <div>
            @peorimutualaid
            <br />
            Venmo
          </div>
          <div>
            $peoriamutualaid <br />
            Cashapp
          </div>
          <div>
            peoriamutualaid@gmail.com
            <br />
            PayPal
          </div>
        </div>
        <div className='fundraiser-goal'>
          <h3>Let's Raise $500 for PMA!</h3>
          <h2>
            <strong>${props.amount}</strong> of <strong>$500</strong> raised
          </h2>
        </div>
      </div>
    </div>
  );
}
