/* Use this to show a fixed debug state div somewhere on the page that will print an overlay of the value of the data properties */

type DebugStateProps = {
	data: any;
	top?: string | number | undefined;
	right?: string | number | undefined;
	bottom?: string | number | undefined;
	left?: string | number | undefined;
};

export const DebugState = ({ data, top = 60, right = 'auto', bottom = 'auto', left = 0 }: DebugStateProps) => {
	if (!data) return null;
	return (
		<div
			style={{
				position: 'fixed',
				zIndex: 9999,
				textAlign: 'right',
				background: 'white',
				padding: '10px',
				border: '1px solid red',
				top,
				right,
				bottom,
				left,
				width: 200,
				height: 'auto',
				fontSize: '.7rem',
				overflowWrap: 'break-word'
			}}>
			{typeof data == 'object'
				? Object.keys(data).map((k) => {
						const v = data[k];
						return (
							<div style={{ fontSize: '.7rem', lineHeight: '1.2em' }}>
								<span style={{ fontWeight: 'bold', paddingRight: '2px' }}>{k}:</span>
								{typeof v == 'object' ? <div>{JSON.stringify(v)}</div> : <span style={{}}>{v}</span>}
							</div>
						);
					})
				: Array.isArray(data)
					? data.map((v) => {
							return (
								<div style={{ fontSize: '.7rem', lineHeight: '1.2em' }}>
									{typeof v == 'object' ? <div>{JSON.stringify(v)}</div> : <span style={{}}>{v}</span>}
								</div>
							);
						})
					: data}
		</div>
	);
};
