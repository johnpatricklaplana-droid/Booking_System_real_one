export function SpinnerLoading ({ size = 16, color }: Readonly<{ size?: number, color: string }>) {
  
    return (
        <div 
            style={{ width: size, height: size, borderColor: color }} 
            className={`border-b-2 rounded-[50%] animate-spin`}
        >

        </div>
    );

}