import type { CoachResponse } from "../types";

interface Props {
    coach: CoachResponse;
}

function Section({

    icon,

    title,

    items

}: {

    icon: string;

    title: string;

    items: string[];

}) {

    if (!items || items.length === 0) {

        return null;

    }

    return (

        <div

            style={{

                marginBottom: "20px"

            }}

        >

            <h4

                style={{

                    marginBottom: "10px",

                    color: "#374151"

                }}

            >

                {icon} {title}

            </h4>

            <ul

                style={{

                    paddingLeft: "20px",

                    margin: 0

                }}

            >

                {

                    items.map(

                        item => (

                            <li

                                key={item}

                                style={{

                                    marginBottom: "8px",

                                    lineHeight: 1.5

                                }}

                            >

                                {item}

                            </li>

                        )

                    )

                }

            </ul>

        </div>

    );

}

export default function AICoachCard(

    {

        coach

    }: Props

) {

    return (

        <div

            className="ai-card"

        >

            <div

                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center"

                }}

            >

                <h2>

                    🤖 AI Financial Coach

                </h2>

                <span

                    style={{

                        fontSize: "12px",

                        background: "#dcfce7",

                        padding: "4px 10px",

                        borderRadius: "999px",

                        color: "#166534"

                    }}

                >

                    AI Powered

                </span>

            </div>

            <p style={{color: "#6b7280", marginBottom: "24px"}}>
                Personalized recommendations generated from your financial data.
            </p>
            <p style={{color: "#CE2029", marginBottom: "24px" }}>
<b>DISCLAIMER</b> : This content was generated with assistance from AI. AI-generated content may contain errors or inaccuracies. Always verify critical information.
This information provided for general informational purposes only. It is not a substitute for professional [legal/medical/financial] advice, and we are not responsible for any actions taken based on these outputs
            </p>

            <Section

                icon="🟢"

                title="Wins"

                items={coach.wins}

            />

            <Section

                icon="⚠️"

                title="Risks"

                items={coach.risks}

            />

            <Section

                icon="🚀"

                title="Opportunities"

                items={coach.opportunities}

            />

            <Section

                icon="🎯"

                title="Actions"

                items={coach.actions}

            />

        </div>

    );

}