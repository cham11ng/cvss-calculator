import React from 'react';

const Main = () => {
  return (
    <>
      <hgroup>
        <h3>CVSS v3.1 Base Score Calculator</h3>
      </hgroup>
      <br />
      <div id="cvssboard">
        <div className="cvssjs">
          <dl className="AV">
            <dt>Attack Vector</dt>
            <dd>
              <input name="AV" value="N" id="cvssboardAVN" className="AVN" type="radio" />

              <label htmlFor="cvssboardAVN"><i className="AVN"></i>Network </label><small><b>Worst:</b> The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet. Such a vulnerability is often termed “remotely exploitable” and can be thought of as an attack being exploitable at the protocol level one or more network hops away (e.g., across one or more routers).
              </small>
            </dd>
            <dd>
              <input name="AV" value="A" id="cvssboardAVA" className="AVA" type="radio" />
              <label htmlFor="cvssboardAVA">
                <i className="AVA"></i>Adjacent </label><small><b>Worse:</b> The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology. This can mean an attack must be launched from the same shared physical (e.g., Bluetooth or IEEE 802.11) or logical (e.g., local IP subnet) network, or from within a secure or otherwise limited administrative domain (e.g., MPLS, secure VPN to an administrative network zone). One example of an Adjacent attack would be an ARP (IPv4) or neighbor discovery (IPv6) flood leading to a denial of service on the local LAN segment.</small></dd>
            <dd>
              <input name="AV" value="L" id="cvssboardAVL" className="AVL" type="radio" />
              <label htmlFor="cvssboardAVL">
                <i className="AVL"></i>Local </label><small><b>Bad:</b> The vulnerable component is not bound to the network stack and the attacker’s path is via read/write/execute capabilities. Either: <ul><li>the attacker exploits the vulnerability by accessing the target system locally (e.g., keyboard, console), or remotely (e.g., SSH);</li><li>or the attacker relies on User Interaction by another person to perform actions required to exploit the vulnerability (e.g., using social engineering techniques to trick a legitimate user into opening a malicious document).</li></ul></small>
            </dd>
            <dd>
              <input name="AV" value="P" id="cvssboardAVP" className="AVP" type="radio" />
              <label htmlFor="cvssboardAVP">
                <i className="AVP"></i>Physical </label><small><b>Bad:</b> The attack requires the attacker to physically touch or manipulate the vulnerable component. Physical interaction may be brief (e.g., evil maid attack) or persistent. An example of such an attack is a cold boot attack in which an attacker gains access to disk encryption keys after physically accessing the target system. Other examples include peripheral attacks via FireWire/USB Direct Memory Access (DMA).</small>
            </dd>
          </dl>
          <dl className="AC"><dt>Attack Complexity</dt>
            <dd>
              <input name="AC" value="L" id="cvssboardACL" className="ACL" type="radio" />

              <label htmlFor="cvssboardACL"><i className="ACL"></i>Low </label><small><b>Worst:</b> Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.</small>
            </dd>
            <dd>
              <input name="AC" value="H" id="cvssboardACH" className="ACH" type="radio" />

              <label htmlFor="cvssboardACH"><i className="ACH"></i>High </label><small><b>Bad:</b> A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected.</small>
            </dd>
          </dl>
          <dl className="PR"><dt>Privileges Required</dt>
            <dd>
              <input name="PR" value="N" id="cvssboardPRN" className="PRN" type="radio" />
              <label htmlFor="cvssboardPRN"><i className="PRN">
              </i>None </label><small><b>Worst:</b> The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the the vulnerable system to carry out an attack.</small>
            </dd>
            <dd>
              <input name="PR" value="L" id="cvssboardPRL" className="PRL" type="radio" />
              <label htmlFor="cvssboardPRL"><i className="PRL"></i>Low </label><small><b>Worse</b> The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.</small>

            </dd>
            <dd>

              <input name="PR" value="H" id="cvssboardPRH" className="PRH" type="radio" />
              <label htmlFor="cvssboardPRH"><i className="PRH"></i>High </label><small><b>Bad:</b> The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access to component-wide settings and files.</small></dd>
          </dl>
          <dl className="UI"><dt>User Interaction</dt>
            <dd>
              <input name="UI" value="N" id="cvssboardUIN" className="UIN" type="radio" />
              <label htmlFor="cvssboardUIN">
                <i className="UIN"></i>None </label><small><b>Worst:</b> The vulnerable system can be exploited without interaction from any user.</small>
            </dd>
            <dd>
              <input name="UI" value="R" id="cvssboardUIR" className="UIR" type="radio" />
              <label htmlFor="cvssboardUIR"><i className="UIR"></i>Required </label><small><b>Bad:</b> Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, a successful exploit may only be possible during the installation of an application by a system administrator.</small></dd></dl><dl className="S"><dt>Scope</dt>
            <dd>
              <input name="S" value="C" id="cvssboardSC" className="SC" type="radio" />
              <label htmlFor="cvssboardSC"><i className="SC"></i>Changed </label><small><b>Worst:</b> An exploited vulnerability can affect resources beyond the security scope managed by the security authority of the vulnerable component. In this case, the vulnerable component and the impacted component are different and managed by different security authorities.</small>
            </dd>
            <dd>
              <input name="S" value="U" id="cvssboardSU" className="SU" type="radio" />
              <label htmlFor="cvssboardSU"><i className="SU"></i>Unchanged </label><small><b>Bad:</b> An exploited vulnerability can only affect resources managed by the same security authority. In this case, the vulnerable component and the impacted component are either the same, or both are managed by the same security authority.</small></dd></dl><dl className="C"><dt>Confidentiality</dt>
            <dd>
              <input name="C" value="H" id="cvssboardCH" className="CH" type="radio" />
              <label htmlFor="cvssboardCH"><i className="CH"></i>High </label><small><b>Worst:</b> There is a total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact. For example, an attacker steals the administrator's password, or private encryption keys of a web server.</small>
            </dd>
            <dd>
              <input name="C" value="L" id="cvssboardCL" className="CL" type="radio" />
              <label htmlFor="cvssboardCL"><i className="CL"></i>Low </label><small><b>Bad:</b> There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the impacted component.</small>
            </dd>
            <dd>
              <input name="C" value="N" id="cvssboardCN" className="CN" type="radio" />
              <label htmlFor="cvssboardCN"><i className="CN"></i>None </label><small><b>Good:</b> There is no loss of confidentiality within the impacted component.</small></dd></dl><dl className="I"><dt>Integrity</dt>
            <dd>
              <input name="I" value="H" id="cvssboardIH" className="IH" type="radio" />
              <label htmlFor="cvssboardIH"><i className="IH"></i>High </label><small><b>Worst:</b> There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.</small>
            </dd>
            <dd>
              <input name="I" value="L" id="cvssboardIL" className="IL" type="radio" />
              <label htmlFor="cvssboardIL"><i className="IL"></i>Low </label><small><b>Bad:</b> Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact on the impacted component.</small>
            </dd>
            <dd>
              <input name="I" value="N" id="cvssboardIN" className="IN" type="radio" />
              <label htmlFor="cvssboardIN"><i className="IN"></i>None </label><small><b>Good:</b> There is no loss of integrity within the impacted component.</small></dd></dl><dl className="A"><dt>Availability</dt>
            <dd>
              <input name="A" value="H" id="cvssboardAH" className="AH" type="radio" />
              <label htmlFor="cvssboardAH"><i className="AH"></i>High </label><small><b>Worst:</b> There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).</small>
            </dd>
            <dd>
              <input name="A" value="L" id="cvssboardAL" className="AL" type="radio" />
              <label htmlFor="cvssboardAL"><i className="AL"></i>Low </label><small><b>Bad:</b> Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.</small>
            </dd>
            <dd>
              <input name="A" value="N" id="cvssboardAN" className="AN" type="radio" />
              <label htmlFor="cvssboardAN"><i className="AN"></i>None </label><small><b>Good:</b> There is no impact to availability within the impacted component.</small></dd></dl><dl><dt>Severity⋅Score⋅Vector</dt>
            <dd><label className="results"><span className="Low severity" title="0.1 - 3.9">Low<sub>0.1 - 3.9</sub></span><span className="score">3.9</span> <a className="vector" href="#CVSS:3.1/AV:P/AC:H/PR:L/UI:R/S:U/C:H/I:N/A:N">CVSS:3.1/AV:P/AC:H/PR:L/UI:R/S:U/C:H/I:N/A:N</a>
              <button type="button" className="copy-button" title="Copy Vector to Clipboard" style={{ visibility: "visible" }}>Copy</button></label>
            </dd>
          </dl>
        </div>
      </div>
      <footer id="footer">
        <br /><a href="https://github.com/cvssjs">CVSSjs</a> is free to use, copy, modification under a BSD like licence.
        <br />Common Vulnerability Scoring System (CVSS) is a free and open standard. It is owned and managed by <a href="http://www.first.org/cvss">FIRST.Org</a>.
      </footer>
    </>
  )
}

export default Main;